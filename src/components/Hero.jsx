import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[90vh]">
      <img
        className="w-full h-full object-cover"
        src="/background.png"
        alt=""
      />
      <div className="max-w-[1100px] m-auto">
        <div className="absolute top-[15%] sm:top-[40%] w-full max-w-[900px] flex flex-col text-white p-4">
          <h1 className="drop-shadow-[0_2px_2px_rgba(0,0,0)] font-bold text-4xl">빛나는 내일로의 첫 걸음</h1>
          <p className="drop-shadow-[0_2px_2px_rgba(0,0,0)] text-xl py-4 italic">
            오늘의 어둠은 내일의 빛을 낳는 밤이다.<br/>
            어려움이 마주칠 때마다, 우리는 강인함의 씨앗을 심는다. 힘차게 웃고, 어려움을 뛰어넘는 용기를 가지자. <br/>
            작은 성취가 큰 힘을 낳는다. <br/>
            그리고 지금의 노력은 미래의 성공을 키운다. <br/>
            어제의 나보다 오늘의 나, 더 나아진 모습으로 노래하자.<br/>
            우리는 끊임없이 성장하고, 희망을 품으며 내일을 향해 나아간다.<br/>
            불가능한 것은 없다. 꿈을 향해 달려가며, 힘차게 두 손을 흔들어보자.<br/>
            더 나은 미래는 우리의 선택에 달려있다. <br/>
            함께하면 언제나 힘이 나는 새로운 시작이 우리를 기다린다.<br/>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
