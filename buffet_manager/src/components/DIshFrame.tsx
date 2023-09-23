import IBuffetDatabase from "@/interface";

export default function DishFrame({ name, type }: IBuffetDatabase) {
  return (
    <div>
      <h2>{name}</h2>
      <h4>{type}</h4>
      <p>Level:</p>
      <input type="range" min={0} max={4} step={type !== "salada" ? 1 : 2} />
    </div>
  );
}
