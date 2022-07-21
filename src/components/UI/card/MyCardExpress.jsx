import React from "react";
import { useState } from "react";
import cl from "./MyCard.module.css";
import "./MyCard.module.css";
import { CSSTransition } from "react-transition-group";

const MyCardExpress = ({ item, hint }) => {
  const [flipped, setFlipped] = useState(false);

  let studyPlan = item.studyPlan;

  return (
    <div>
      <div className={cl["card-container"]}>
        <button
          className={cl["card-button"]}
          onClick={() => setFlipped(!flipped)}
        >
          <CSSTransition
            in={!flipped}
            timeout={1000}
            classNames="front-face-transition"
          >
            <div className={cl["card-front"]}>
              <h1 className="display-1">{item.expression}</h1>
            </div>
          </CSSTransition>
          <CSSTransition
            in={flipped}
            timeout={1000}
            classNames="back-face-transition"
          >
            <div className={cl["card-back"]}>
              <div className="d-flex justify-content-around w-100">
                <div className="w-50 d-flex flex-column  justify-content-between">
                  <h1 className="display-4 mb-5">Study plan</h1>
                  <p>{hint}</p>
                </div>
                <div className="text-start">
                  {studyPlan.map((el) => (
                    <p>{el}</p>
                  ))}
                </div>
              </div>
            </div>
          </CSSTransition>
        </button>
      </div>
    </div>
  );
};

// return (
//   <div>
//     <div className={cl["card-container"]}>
//       <button
//         className={cl["card-button"]}
//         onClick={() => setFlipped(!flipped)}
//       >
//         <CSSTransition
//           in={!flipped}
//           timeout={1000}
//           classNames="front-face-transition"
//         >
//           <div className={cl["card-front"]}>
//             <h1 className="display-1">{item.item.expression}</h1>
//             <h1 className="display-5">{item.item.phrase}</h1>
//           </div>
//         </CSSTransition>
//         <CSSTransition
//           in={flipped}
//           timeout={1000}
//           classNames="back-face-transition"
//         >
//           <div className="d-flex ">
//             <MyCardList header="Study plan" subtitle="" list={studyPlan} />
//             <MyCardList header="History" subtitle="" list={history} />
//           </div>
//         </CSSTransition>
//       </button>
//     </div>
//   </div>
// );
// };

export default MyCardExpress;
// <CSSTransition
//   in={!side}
//   timeout={500}
//   classNames={cl.animation}
//   // unmountOnExit
//   onEnter={(node) => console.log(node.classList)}
//   onExited={(node) => console.log("exit")}
// >
//   <div className={cl.card}>
//     <h1 className="displwy-4">{side ? item.side1 : item.side2}</h1>
//     <p>{item.tag}</p>
//     <div>
//       <Button onClick={() => setSide(!side)}>rotate</Button>
//     </div>
//   </div>
// </CSSTransition>
