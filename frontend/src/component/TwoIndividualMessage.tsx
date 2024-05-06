

interface props     {
    message: [{}]
}
const TwoIndividualMessage: React.FC<props> = ({ message }) => {
    return (
        <div>
            <div>
                {message.map((msg: any) => {
                    return (
                        <div key = { msg.Id }>{ msg.new_message }</div>
                    )
                })}
            </div>
        </div>
    )
}
export { TwoIndividualMessage }