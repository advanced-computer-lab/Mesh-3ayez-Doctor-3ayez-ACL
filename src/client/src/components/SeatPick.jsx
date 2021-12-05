import SeatPicker from "./react-seat-picker/dist";

export function SeatPick(){
    var cabin ="Economy";
    var head = "";
    if(cabin==="Economy")
        head="Economy Class";
    else if(cabin==="Business")  
        head="Buisness Class";
    else
        head="First Class";     
    const rows = [[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
    ,[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
    ,[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
    ,[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
    ,[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
    ,[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
    ,[{number:"A"},{number:"B"},null,{number:"C"},{number:"D"}]
];
      return (
        <div className="App">
            <h1>{head}</h1>
          <SeatPicker rows={rows} maxReservableSeats={3} visible/>
        </div>
      );
}