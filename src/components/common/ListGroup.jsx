import PropTypes from "prop-types";

const ListGroup = ({
   items,
   nameProperty,
   idProperty,
   selectedItem,
   onItemSelect
}) => {
   return (
      <ul className='list-group mt-5'>
         {items.map(item => (
            <li
               key={item[idProperty]}
               className={
                  item === selectedItem
                     ? "list-group-item active"
                     : "list-group-item"
               }
               style={{ cursor: "pointer" }}
               onClick={() => onItemSelect(item)}
            >
               {item[nameProperty]}
            </li>
         ))}
      </ul>
   );
};

ListGroup.defaultProps = {
   nameProperty: "name",
   idProperty: "_id",
   selectedItem: null
};

ListGroup.propTypes = {
   items: PropTypes.array.isRequired,
   nameProperty: PropTypes.string,
   idProperty: PropTypes.string,
   // selectedItem: PropTypes.any,
   onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;
