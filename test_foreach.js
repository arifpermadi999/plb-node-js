async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  const waitFor = (ms) => new Promise(r => setTimeout(r, ms));


  asyncForEach([1, 2, 3], async (num) => {
    await waitFor(500);
    console.log(num);
  })
  console.log('Done');