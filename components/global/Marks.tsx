type Props = {
  colName: string;
};

export default function Marks({ colName }: Props) {
  return <h2>{colName}</h2>;
}
