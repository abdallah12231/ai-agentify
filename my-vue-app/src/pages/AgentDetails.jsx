import { useParams } from "react-router-dom";

const agents = [
  {
    id: "1",
    name: "WhatsApp Sales Bot",
    desc: "Automates replies and closes sales.",
    price: "$20",
  },
  {
    id: "2",
    name: "Marketing AI Agent",
    desc: "Creates ads and marketing content.",
    price: "$35",
  },
  {
    id: "3",
    name: "Customer Support AI",
    desc: "Handles customer questions 24/7.",
    price: "$25",
  },
];

export default function AgentDetails() {
  const { id } = useParams();

  const agent = agents.find((a) => a.id === id);

  if (!agent) return <h1 className="p-10">Agent not found</h1>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{agent.name}</h1>
      <p className="text-gray-400 mt-4">{agent.desc}</p>
      <p className="mt-4 text-blue-400 text-xl">{agent.price}</p>

      <button className="mt-6 bg-green-600 px-6 py-2 rounded-lg">
        Buy Now
      </button>
    </div>
  );
}