export type ReportDataObj = {
  year: string;
  entity: string;
  scopeName: string;
  categoryId: string;
  activity: string;
  responsible: string;
  submittedDate: string;
  approver: string;
  comment?: string;
  link?: string;
  value: number;
  units?: string;
  materiality: string;
  unitaryCO2: number;
  totalEmissions: number;
  evolution: number;
};
