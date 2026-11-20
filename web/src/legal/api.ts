/** The Impressum details come from the API at runtime: they are set at deploy time and never live in git. */
export interface LegalDetails {
  name: string | null;
  address: string[];
  email: string | null;
  phone: string | null;
  vatId: string | null;
}

/** Null when the API cannot be reached or answers with something else. */
export async function getLegalDetails(): Promise<LegalDetails | null> {
  try {
    const res = await fetch("/api/legal");
    if (!res.ok) return null;
    const body = (await res.json()) as Partial<LegalDetails>;
    return {
      name: body.name ?? null,
      address: Array.isArray(body.address) ? body.address : [],
      email: body.email ?? null,
      phone: body.phone ?? null,
      vatId: body.vatId ?? null,
    };
  } catch {
    return null;
  }
}
