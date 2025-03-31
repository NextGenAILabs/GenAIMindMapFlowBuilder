import SqlSvg from "../assets/sql.svg"
import setDataSource from "../config/setDataSource";
const DataSource = ({ id, data }) => {
    const { img, title, content } = setDataSource(data) || {};
    // const img = SqlSvg
    // const title = "Temp"
    // const content = "content"
    return (
        
        <div className="node-data-source">
            {/* <div>
                    <p className="node-description">Database Name</p>
                    <input type="text" />
                </div>
                <div>
                    <p className="node-description">Table Name</p>
                    <input type="text" />
                </div> */}
            <img src={img} alt="sql svg" />
            <div>
                <h4>{title}</h4>
                <p className="values">{content}</p>
            </div>
        </div>
    );
};

export default DataSource;
