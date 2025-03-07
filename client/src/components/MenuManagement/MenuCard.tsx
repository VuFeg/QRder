import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../types/menu.type";

interface MenuCardProps {
  item: Menu;
  onDelete: (id: string) => void;
}

const MenuCard = ({ item, onDelete }: MenuCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm flex flex-col justify-between">
      <div>
        <img
          src={item.image_url}
          alt={item.name_en}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading text-lg">{item.name_en}</h3>
            <p className="text-muted-foreground">{item.name_vi}</p>
          </div>
          <p className="text-accent font-bold">${item.price}</p>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            item.available
              ? "bg-chart-2/20 text-chart-2"
              : "bg-destructive/20 text-destructive"
          }`}
        >
          {item.available ? "Available" : "Unavailable"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/menu/edit/${item.id}`)}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
