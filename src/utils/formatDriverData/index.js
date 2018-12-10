export default function formatDriverData(driverData) {
  let formattedDriverData = []
  driverData.forEach(driver => {
    const newDriver = {
      ...driver,
      id: driver._id
    }
    formattedDriverData.push(newDriver)
  })

  return formattedDriverData
}
