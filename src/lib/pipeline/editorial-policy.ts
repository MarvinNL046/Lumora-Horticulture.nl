/** Publication guard, in addition to the editorial instructions. */
export function assertLeafCarePositioning(fields: Record<string, unknown>): void {
  const text = Object.values(fields).flat().filter((value) => typeof value === 'string').join(' ')
    .normalize('NFKC').replace(/<[^>]*>/g, ' ');
  if (!/neem[\s-]*x[\s-]*pro|neem[\s-]*(?:olie|oil|öl)/i.test(text)) return;
  if (/(?:bestrijd|gewasbescherm|ongedierte|plaag|plagen|spint|spinnen|trips|thrips|bladlui|witte\s*vlieg|insect|mijt|afwer|repellen|pesticid|pest\s*control|crop\s*protection|pflanzenschutz|schädling|bekämpf|spinnmilb|blattläus|weiße\s*fliege|milben|abwehr)/i.test(text)) {
    throw new Error('NeemXPRO content requires editorial review: only leaf-care positioning is permitted.');
  }
}

export const LEAF_CARE_INSTRUCTIONS = `NeemXPRO is botanical leaf care (bladverzorging / Blattpflege) only.
Never include pest names, pest-control, repellent, prevention or crop-protection claims in content mentioning NeemXPRO.
Do not infer properties of this oil blend from generic neem oil. Do not recommend it in unrelated horticultural articles.
Use only confirmed product information and refer to the current product instructions for application. Never invent a dose, treatment schedule, certification or efficacy claim.`;
