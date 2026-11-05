"""Genera miniapp/defaults.js dai valori predefiniti Python (così la Mini App riceve solo le differenze)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dealsbot import profile as P
from dealsbot.sources.amazon import CATEGORIES
d = {"DEFAULT": P.DEFAULT, "TEMPLATES": P.TEMPLATES, "TAGS": P.TAGS, "DAYS": P.DAYS, "DEAL_TYPES": P.DEAL_TYPES, "CATEGORIES": list(CATEGORIES)}
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "defaults.js"), "w").write("window.DB_DEFAULTS=" + json.dumps(d, ensure_ascii=False) + ";\n")
print("defaults.js ok")
