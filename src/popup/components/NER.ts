export type NERResult = {
  ALBUM: string[] | null;
  ORIGINAL_AUTHOR: string[] | null;
  VOCALIST: string[] | null;
  MODIFIER: string[] | null;
  TITLE: string[] | null;
  MISC_PERSON: string[] | null;
  FEATURING: string[] | null;
};

export default function formatNER(ner: NERResult | null, defaultTitle: string, defaultArtist: string) {
  let title = defaultTitle;
  let artist = defaultArtist.replace("- Topic", "").trim();

  if (ner) {
    const nerTitle = ner.TITLE && ner.TITLE.length > 0 ? ner.TITLE[0] : null;
    const nerArtist = ner.ORIGINAL_AUTHOR && ner.ORIGINAL_AUTHOR.length > 0 ? ner.ORIGINAL_AUTHOR.join(" x ") : null;
    const modifiers = ner.MODIFIER || [];
    const modifierStr = modifiers.length ? ` (${modifiers.join(", ")})` : "";
    const performers = ner.VOCALIST || [];
    const featuring = ner.FEATURING || [];
    const performerStr = performers.length ? ` performed by ${performers.join(", ")}` : "";
    const featuringStr = featuring.length ? ` feat. ${featuring.join(", ")}` : "";
    if (nerTitle) title = `${nerTitle}${modifierStr}`;
    if (nerArtist) artist = `${nerArtist}${featuringStr}${performerStr}`;
  }

  return {title, subtitle: artist};
}
