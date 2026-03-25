#!/usr/bin/env python3
"""Extract recipe data from XLS files for Ancient Pantry."""
import sys
import xlrd

def extract_recipe(path):
    wb = xlrd.open_workbook(path)
    target_sheet = None
    for sheet in wb.sheets():
        name = sheet.name.strip().lower()
        if 'sheet 1' in name or name == 'sheet1' or name == 'recipe':
            target_sheet = sheet
            break
    if target_sheet is None and wb.nsheets > 0:
        # Try second sheet (first is often blank/template)
        for i, sheet in enumerate(wb.sheets()):
            if sheet.nrows > 3:
                target_sheet = sheet
                break
    if target_sheet is None:
        target_sheet = wb.sheets()[-1]

    rows = []
    for row in range(target_sheet.nrows):
        vals = [str(target_sheet.cell(row, col).value).strip() for col in range(target_sheet.ncols)]
        if any(v for v in vals):
            rows.append(vals)
    return rows

def parse_recipe(rows):
    dish_name = ""
    category = ""
    meal_period = ""
    ingredients = []
    method_lines = []
    in_ingredients = False
    in_method = False

    for row in rows:
        text = " | ".join(v for v in row if v)
        first = row[0].strip() if row else ""
        second = row[2].strip() if len(row) > 2 else ""

        if "Dish Name" in first:
            dish_name = second
        elif "Recipe Category" in first:
            category = second
        elif "Meal Period" in first:
            meal_period = second
        elif "Qty" in first and "Unit" in row[1] if len(row) > 1 else False:
            in_ingredients = True
        elif "Method" in first or "Method:" in first:
            in_ingredients = False
            in_method = True
        elif in_ingredients and first and first not in ["Qty", "Ingredients"]:
            qty = row[0].strip() if row else ""
            unit = row[1].strip() if len(row) > 1 else ""
            desc = row[2].strip() if len(row) > 2 else ""
            if desc:
                if qty and qty != "0.0":
                    try:
                        q = float(qty)
                        ingredients.append(f"{q:g} {unit} {desc}".strip())
                    except:
                        if desc:
                            ingredients.append(desc)
                else:
                    ingredients.append(desc)
        elif in_method:
            content = " ".join(v for v in row if v).strip()
            if content and "Method" not in content[:10]:
                method_lines.append(content)

    return {
        "dish_name": dish_name,
        "category": category,
        "meal_period": meal_period,
        "ingredients": ingredients,
        "method": method_lines,
    }

if __name__ == "__main__":
    path = sys.argv[1]
    rows = extract_recipe(path)
    data = parse_recipe(rows)
    print(f"DISH: {data['dish_name']}")
    print(f"CATEGORY: {data['category']}")
    print(f"MEAL: {data['meal_period']}")
    print("\nINGREDIENTS:")
    for i in data['ingredients']:
        print(f"  - {i}")
    print("\nMETHOD:")
    for m in data['method']:
        print(f"  {m}")
