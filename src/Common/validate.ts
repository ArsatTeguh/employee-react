type TypeIntial = {
  id: number;
  name: string;
  status: string;
  id_employee: {name: string, id: number|null};
};

export const hasEmptyField = (positions: TypeIntial[]) => {
  return positions.some(
    (position) =>
      !position.name || !position.status || position.id_employee.id === null
  );
};

export const hasEmptyFieldObjs = (data: any) => {
  for (const value of Object.values(data)) {
    if (value === "") {
      return true; 
    }
  }
  return false;
};

