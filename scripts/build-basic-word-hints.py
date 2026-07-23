import csv
import json
import re
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_CSV = PROJECT_ROOT.parents[1] / "vendor" / "ECDICT" / "ecdict.csv"
OUTPUT_TS = PROJECT_ROOT / "src" / "data" / "basicWordHints.ts"
LIMIT = 3500
BAD_TRANSLATION_MARKERS = (
    "DOS",
    "批处理",
    "信息论",
    "输入终端",
    "智能终端",
    "内捕获",
    "地址转换器",
    "异常传输",
    "自动订票",
    "后端",
    "总线允许",
    "自治系统",
    "高级系统",
    "辅助存储器",
    "作废字符",
    "异常数据",
    "乱码",
)

WORD_OVERRIDES = {
    "natural": "自然的；天然的；天生的",
    "naturally": "自然地；天生地",
    "master": "掌握；精通；大师",
    "program": "节目；程序；计划",
    "plain": "简单清楚的；朴素的",
    "stand": "站；忍受",
    "catch": "抓住；听懂；赶上；碰到",
    "wish": "希望；愿望",
    "tell": "告诉；讲述",
    "might": "可能会；也许会",
    "could": "可以；能够；用于礼貌请求",
    "would": "会；想要；用于礼貌表达",
    "should": "应该",
    "may": "可能；可以",
    "must": "必须；一定是",
}


def rank_value(value: str) -> int:
    try:
        number = int(value or "0")
    except ValueError:
        return 999999
    return number if number > 0 else 999999


def clean_translation(value: str, word: str = "") -> str:
    if word in WORD_OVERRIDES:
        return WORD_OVERRIDES[word]
    text = (value or "").replace("\\n", "；").replace("\n", "；")
    text = re.sub(r"\[[^\]]+\]", "", text)
    text = re.sub(r"\s+", " ", text).strip(" ；;")
    text = re.sub(r"\b[a-z]+\.\s*", "", text)
    parts = [part.strip() for part in re.split(r"[；;]", text) if part.strip()]
    clean_parts = [
        part
        for part in parts
        if not any(marker in part for marker in BAD_TRANSLATION_MARKERS)
    ]
    clean = "；".join(clean_parts or parts).strip(" ；;")
    return clean[:72].strip(" ；;") or "待补充中文"


def is_good_word(word: str, translation: str) -> bool:
    if not re.fullmatch(r"[a-z]{2,18}", word):
        return False
    if not translation.strip():
        return False
    if any(marker in translation for marker in ("人名", "地名", "缩写", "商标")):
        return False
    return True


def score_row(row: dict[str, str]) -> tuple[int, int, str]:
    bnc = rank_value(row.get("bnc", ""))
    frq = rank_value(row.get("frq", ""))
    frequency_rank = min(bnc, frq)
    tag_bonus = 0
    tag = row.get("tag", "")
    if row.get("oxford"):
        tag_bonus -= 120000
    if row.get("collins"):
        tag_bonus -= 50000
    if any(item in tag for item in ("zk", "gk", "cet4", "ky")):
        tag_bonus -= 30000
    return (frequency_rank + tag_bonus, len(row.get("word", "")), row.get("word", ""))


def main() -> None:
    if not SOURCE_CSV.exists():
        raise SystemExit(f"Missing source dictionary: {SOURCE_CSV}")

    rows: list[dict[str, str]] = []
    with SOURCE_CSV.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            word = (row.get("word") or "").strip().lower()
            translation = row.get("translation") or ""
            if not is_good_word(word, translation):
                continue
            if rank_value(row.get("bnc", "")) == 999999 and rank_value(row.get("frq", "")) == 999999 and not row.get("oxford"):
                continue
            row["word"] = word
            rows.append(row)

    selected: dict[str, dict[str, str]] = {}
    for row in sorted(rows, key=score_row):
        word = row["word"]
        if word in selected:
            continue
        selected[word] = row
        if len(selected) >= LIMIT:
            break

    entries = []
    for word, row in selected.items():
        meaning = clean_translation(row.get("translation", ""), word)
        sentence = f'I learned the word "{word}" today.'
        entries.append(f"  {json.dumps(word)}: {{ meaning: {json.dumps(meaning, ensure_ascii=False)}, sentence: {json.dumps(sentence)} }}")

    OUTPUT_TS.write_text(
        "\n".join(
            [
                'import type { WordHint } from "./wordHints";',
                "",
                "// Generated from ECDICT (MIT License). Keep this file local and deterministic.",
                f"// Entries: {len(entries)}",
                "export const basicWordHints: Record<string, WordHint> = {",
                ",\n".join(entries),
                "};",
                "",
            ]
        ),
        encoding="utf-8",
    )
    print(f"Generated {len(entries)} entries at {OUTPUT_TS}")


if __name__ == "__main__":
    main()
