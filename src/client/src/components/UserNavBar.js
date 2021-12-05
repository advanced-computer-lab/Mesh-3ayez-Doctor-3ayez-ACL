import React from 'react'
import SeatPicker from 'react-seat-picker'


function UserNavBar() {
    const rows = [
        [
            { number: 1 },
            { number: 2, isSelected: true },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 }
        ],
        [],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 },
            { number: 12 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 },
            { number: 12 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 },
            { number: 11 }
        ],
        [
            { number: 1 },
            { number: 2 },
            { number: 3, isReserved: true },
            { number: 4 },
            { number: 5 },
            { number: 6 },
            { number: 7 },
            { number: 8 },
            { number: 9 },
            { number: 10 }
        ]
    ];        console.log(rows[0][1].isSelected);

    return (
        <div>
                <h1>Seat Picker</h1>
                <SeatPicker
                    rows={rows}
                    maxReservableSeats={3}
                    visible
                />
        </div>
    )
}

export default UserNavBar
