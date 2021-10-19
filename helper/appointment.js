import moment from 'moment'
import API from '../Util/api'

const appointment = {
  create: data =>
    new Promise(function (resolve, reject) {
      API.post('appointment', data, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    }),
  update: data =>
    new Promise(function (resolve, reject) {
      API.patch('appointment', data, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    }),
  get: () =>
    new Promise(function (resolve, reject) {
      API.get('appointment', {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(appointment.format(res.data))
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    }),
  getUpcoming: () =>
    new Promise(function (resolve, reject) {
      API.get('appointment/upcoming', {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            resolve(appointment.format(res.data))
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    }),
  format: data => {
    const formatted = []

    for (const d of data) {
      formatted.push({
        appointment_id: d.appointment_id,
        doctor_id: d.doctor_id,
        doctor_name: d.doctor_name,
        image: d.image,
        meetingLink: d.meeting_link,
        status: d.status,
        status_id: d.status_id,
        timeslot: moment(d.timeslot).format('hh:mm A - ddd - DD,MMM'),
      })
    }

    return formatted
  },
  getPatients: () =>
    new Promise(function (resolve, reject) {
      API.get('appointment/patients', {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            console.log(res.data)
            resolve(appointment.formatPatients(res.data))
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    }),
  formatPatients: data => {
    const formatted = []

    for (const d of data) {
      formatted.push({
        appointment_id: d.appointment_id,
        doctor_name: d.name,
        meetingLink: d.meeting_link,
        status: d.status,
        status_id: d.status_id,
        timeslot: moment(d.timeslot).format('hh:mm A - ddd - DD,MMM'),
      })
    }

    return formatted
  },
  getTime: (doctor_id) => {
    const TIME_ARRAY = [
      { id: 1, time: '9:30 AM', selected: true },
      { id: 2, time: '10:30 AM', selected: false },
      { id: 3, time: '11:00 AM', selected: false },
      { id: 4, time: '11:30 AM', selected: false },
      { id: 5, time: '12:00 AM', selected: false },
      { id: 6, time: '12:30 AM', selected: false, disabled: true },
      // {id: 6, time: '12:30 AM', selected: false, disabled: true},
    ]

    const timeSlots = {}
    let keyDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)

    while (keyDate <= endDate) {
      timeSlots[moment(keyDate).format("DD/MM/YY")] = [...TIME_ARRAY]
      keyDate.setDate(keyDate.getDate() + 1)
    }

    return new Promise(function (resolve, reject) {
      API.get('appointment/time-slot?doctor_id=' + doctor_id, {
        headers: {
          'x-access-token': global.config.accessToken,
        },
      })
        .then(async res => {
          if (res.status === 200) {
            const appointments = res.data
            Object.keys(appointment).map(a => {
              console.log(a)
              appointment[a].forEach(time => {
                timeSlots[a].forEach(t => {
                  const hh = time.getTime()
                  console.log(hh)
                  // if( === moment(t.time) )
                })
              })
            })
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default appointment
