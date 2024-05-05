

interface props {
    allreceiverMessages: string[]
    allsenderMessages: string[]
}
const TwoIndividualMessage: React.FC<props> = ({ allreceiverMessages, allsenderMessages }) => {
    return (
        <div>
            <div>
                <div>
                    {allreceiverMessages.map((message, index) => {
                        return (
                            <div key = { index }> { message }</div>
                        )
                    })}
                </div>
                <div>
                    {allsenderMessages.map((message, index) => {
                        return (
                            <div key = { index }>{ message }</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}
export { TwoIndividualMessage }