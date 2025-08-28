// Type definition for penalcode.js
declare module "*/penalcode.js" {
  interface Statute {
    id: string;
    title: string;
    description: string;
    class: "Felony" | "Misdemeanor" | "Infraction";
    months: number;
    fine: number;
  }

  interface PenalCodeCategory {
    Title: string;
    Statutes: { [key: string]: Statute };
  }

  const PenalCode: PenalCodeCategory[];
  export default PenalCode;
}
