
export default function Questioncard({ question,options,onAnswer, selected }) {

    // const [selected,setSelected] = useState(null)

    // function handleSelect(option){
    //     setSelected(option);
    //     setTimeout(() => {
    //         onAnswer(option)
    //     }   , 500)
    // }

    return (
        <div className="card w-full max-w-lg bg-gray-800 shadow-xl border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">{question}</h2>
            <div className="grid gap-2">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(option)}
                        className="btn btn-primary w-full"
                        disabled={selected ? true : false}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

    // return (
    //     // <div className="hero min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-purple-600">
    //     //     <div className="hero-content flex-col lg:flex-row-reverse">
    //     //         <div className="text-center lg:text-left text-white">
    //     //             <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-lg">Queezy</h1>
    //     //             <p className="py-6 text-gray-200">
    //     //                 Welcome Back!
    //     //                 <span> Log in to continue your quiz journey and challenge yourself with AI-powered questions!</span>
    //     //             </p>
    //     //         </div>
    //     //         <div className="card w-full max-w-sm shadow-2xl bg-gray-900 border border-gray-700">
    //     //             <div className="card-body">
    //     //                 <h2 className="text-white text-lg font-bold mb-4">{question}</h2>
    //     //                 {options?.length > 0 ? (
    //     //                     options.map((option, index) => (
    //     //                         <button
    //     //                             key={index}
    //     //                             onClick={() => handleSelect(option)}
    //     //                             className={`btn w-full mb-2 ${
    //     //                                 selected === option ? 'btn-primary' : 'btn-ghost'
    //     //                             }`}
    //     //                         >
    //     //                             {option}
    //     //                         </button>
    //     //                     ))
    //     //                 ) : (
    //     //                     <p className="text-gray-400">No options available.</p>
    //     //                 )}
    //     //             </div>
    //     //         </div>
    //     //     </div>
    //     // </div>
    //     )
    // }