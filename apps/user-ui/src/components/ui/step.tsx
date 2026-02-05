
interface IProps {
    activeStep: number;
    arrayStep: string[];

}
function Step({ activeStep, arrayStep }: IProps) {

    return (
        <div className="w-full flex flex-col items-center pt-10 h-fit">
            <div className="relative flex items-center justify-between w-[80%] md:w-[50%] mb-8">
                <div className="absolute top-[25%] left-0 w-full h-1 bg-gray-300 -z-10" />

                {arrayStep.map((step, index) => {
                    const stepIndex = Number(index + 1)
                    return (
                        <div key={index} className={`flex flex-col justify-center ${index === arrayStep.length - 1 ? "items-end" : index === 0 ? "items-start" : "items-center"}`}>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${stepIndex <= activeStep ? "bg-blue-600" : "bg-gray-300"
                                } transition-colors`}>
                                {stepIndex}
                            </div>

                            <span className={`whitespace-nowrap text-xs md:text-sm ${index === arrayStep.length - 1 ? "text-right mr-[-20px]" : index === 0 ? "text-left ml-[-20px]" : "text-center"}`}>
                                {arrayStep[stepIndex-1]}
                            </span>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default Step;