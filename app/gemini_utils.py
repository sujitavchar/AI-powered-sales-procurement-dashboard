import google.generativeai as genai
import os
import json
from dotenv import load_dotenv
import re

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")  

# Helper: Format records into text
def format_records_for_gemini(records):
    formatted = ""
    for r in records:
        formatted += (
            f"- Metric: {r.metric}, Date: {r.date_recorded}, Result: {r.result}, "
            f"Status: {r.status}\n"
        )
    return formatted

#  Analyze Compliance Patterns
def analyze_compliance_patterns(records):
    prompt = (
        "You are a compliance analyst. Given the following supplier performance data, "
        "identify major non-compliance patterns. Categorize issues like 'delivery delays', "
        "'quality issues', and give a summary.\n\n"
    )
    formatted = format_records_for_gemini(records)
    full_prompt = prompt + formatted

    try:
        response = model.generate_content(full_prompt)
        return {"summary": response.text}
    except Exception as e:
        return {"error": str(e)}

#  Generate Improvement Suggestions
def generate_compliance_insights(suppliers):
    prompt = (
        "You are a supplier compliance expert AI. Analyze each supplier's contract terms and compliance score, "
        "and provide meaningful, actionable output in this exact JSON format (without extra explanation or markdown):\n\n"
        "[\n"
        "  {\n"
        "    \"supplier\": \"<name>\",\n"
        "    \"score\": <compliance_score>,\n"
        "    \"contract_terms\": { \"key\": \"value\" },\n"
        "    \"issues\": [\"summarized issue 1\", \"summarized issue 2\"],\n"
        "    \"recommendations\": [\"recommendation 1\", \"recommendation 2\"]\n"
        "  }\n"
        "]\n\n"
        "Strict rules:\n"
        "1. Carefully assess delivery days, discount rates, and quality terms.\n"
        "2. Return at least 1 issue and 1 recommendation per supplier.\n"
        "3. Score below 90 = flag risks or areas for contract improvement.\n"
        "4. Do not include markdown or explanations.\n\n"
        "Here is the supplier data:\n"
    )


    #Format prompt for all suppliers
    for s in suppliers:
        prompt += (
            f"- Supplier: {s.name}, Score: {s.compliance_score}, "
            f"Terms: {s.contract_terms}\n"
        )


    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        #print(text)
        # Parse full response as JSON list
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        structured = json.loads(text)
        return structured
    except json.JSONDecodeError as e:
        return [{"error": "Gemini responded, but JSON parsing failed", "details": str(e)}]
    except Exception as e:
        return [{"error": str(e)}]
