import { TIMEOUT } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * @param {string} api API sa ključem
 * @param {Object} [updateData=undefined] prihvata novi recept za unos
 * @returns {Object | Object[]} vrati traženi/e recepte ili vrati podatke o novom receptu
 * @author Aidin Ibrahimkadic
 */
export const AJAX = async function (api, updateData = undefined) {
  try {
    const apiData = updateData
      ? fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        })
      : fetch(api);

    const rec = await Promise.race([apiData, timeout(TIMEOUT)]);

    const data = await rec.json();
    if (!rec.ok) {
      throw new Error(`${data.message} (${rec.status})`);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// export const GET_JSON = async function (api) {
//   try {
//     const apiData = fetch(api);
//     const rec = await Promise.race([apiData, timeout(TIMEOUT)]);
//     const data = await rec.json();
//     if (!rec.ok) {
//       throw new Error(`${data.message} (${rec.status})`);
//     }

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
// export const SEND_JSON = async function (api, updateData) {
//   try {
//     const apiData = fetch(api, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updateData),
//     });

//     const rec = await Promise.race([apiData, timeout(TIMEOUT)]);

//     const data = await rec.json();
//     if (!rec.ok) {
//       throw new Error(`${data.message} (${rec.status})`);
//     }

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
