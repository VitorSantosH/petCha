import React from "react";

const Teste = (props) => {

    return (
        <div className="teste">
            <div className="Heaer">

                <span>
                    {props.title}
                </span>

            </div>
            <div className="Content">

                {props.clildren}

            </div>
        </div>
    )
}


export default Teste