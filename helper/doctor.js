import API from '../Util/api'

const doctor = {
  get: filter =>
    new Promise(function (resolve, reject) {
      const filterUrl = doctor.getFilterUrl(filter)
      API.get('doctor?' + filterUrl)
        .then(async res => {
          if (res.status === 200) {
            resolve(doctor.format(res.data.doctors))
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    }),
  getById: doctor_id =>
    new Promise(function (resolve, reject) {
      API.get('doctor/id?doctor_id=' + doctor_id)
        .then(async res => {
          if (res.status === 200) {
            if (res.data.code == 200) {
              resolve(res.data)
            } else {
              alert('Doctor not found!')
            }
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
        doctor_id: d.doctor_id,
        doctor_name: d.doctor_name,
        specialisation: d.specialisation,
        experience: d.experience,
        image: d.image,
        email_id: d.email_id,
        phone: d.phone,
        qualification: d.qualification,
        languages: d.languages,
        fees: d.fees || 200,
        is_active: d.is_active,
        // created_at: '2021-07-06T06:55:14.000Z',
        // updated_at: '2021-07-06T06:55:36.000Z',
      })
    }

    return formatted
  },
  getFilterUrl: filter => {
    if (filter == undefined) {
      return ''
    }

    let filterUrl = ''

    if (
      filter.specialisations !== undefined &&
      filter.specialisations.length > 0
    ) {
      filter.specialisations.forEach(
        (b, i) => (filterUrl += '&specialisations[' + i + ']=' + b),
      )
    }

    return filterUrl
  },
}

export default doctor
