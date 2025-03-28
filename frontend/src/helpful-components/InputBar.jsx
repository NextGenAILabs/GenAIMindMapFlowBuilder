const InputBar = ({ data }) => {
	return (
		< div className="input-bar" >
			<label htmlFor="text">{data.label}</label>
			<input id="bar-input" type={data.type} placeholder={data.placeholder} onChange={(e) => data.setTableName(e.target.value)} />
		</div >
	)
}

export default InputBar	