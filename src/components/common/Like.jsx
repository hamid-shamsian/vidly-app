const Like = ({ liked, onClick }) => {
   let classes = "fa fa-heart";
   if (!liked) classes += "-o";
   return (
      <i
         className={classes}
         style={{ cursor: "pointer" }}
         onClick={onClick}
      ></i>
   );
};

export default Like;
