import React from "react";

export default function SeatGuide(){

    const reserved={width:"30px",height:"30px",backgroundColor:"#E0E0E0" , borderRadius:"10%", marginLeft:"20px",marginTop:"15px",display:"inline-block"};
    const selected={width:"30px",height:"30px",backgroundColor:"#4CAF50" , borderRadius:"10%", marginLeft:"20px",marginTop:"15px",display:"inline-block"};
    const available={width:"30px",height:"30px",backgroundColor:"#4FC3F7" , borderRadius:"10%", marginLeft:"20px",marginTop:"15px",display:"inline-block"};
    const dsp={display:"inline-block",position:"absolute",padding:"4px 10px"};
    return(
        <div style={{boxShadow:"3px 4px #999999",borderRadius:"4%",display:"inline-block",width:"380px",height:"63px",backgroundColor:"whitesmoke",textAlign:"left"}}>
        <div style={{position:"absolute",margin:"0 auto auto auto"}}><div style={available} ></div> <p style={dsp}><strong>Available</strong></p></div>
        <div style={{position:"absolute",margin:"0 auto auto 120px"}}><div style={selected} ></div> <p style={dsp}><strong>Selected</strong></p> </div>        
        <div style={{position:"absolute",margin:"0 auto auto 240px"}}><div style={reserved} ></div> <p style={dsp}><strong>Reserved</strong></p> </div>
        </div>
    );
}