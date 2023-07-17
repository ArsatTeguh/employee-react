const colors = ["white", "black", "primary"] as const;
const types = [
  { normal: "px-[15px] py-[5px]" },
  { large: "px-[24px] py-[8px]" },
] as const;

const background = ["secondary", "primary", "error", "success"] as const;

type Ibutton<T> = {
  content: T | "Masukan value";
  background: (typeof background)[number] | (typeof background)[1];
  type: (typeof types)[number] | (typeof types)[0];
  color: (typeof colors)[number] | (typeof colors)[2];
};
