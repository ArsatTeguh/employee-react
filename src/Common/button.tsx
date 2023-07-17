export const Button = <T extends string>(props: Ibutton<T>) => {
  return (
    <button className={`${props.background} ${props.color} ${props.type}`}>
      {props.content}
    </button>
  );
};
