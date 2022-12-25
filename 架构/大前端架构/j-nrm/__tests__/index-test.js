const { exec } = require("child_process")

test("j-nrm -V", () => {
  const { name, version } = require("../package.json");
  exec(`node bin/index.js -V`, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error：${error}`)
      return;
    }

    expect(stdout).toContain(`${name} v${version}`)
  })
})

test("j-nrm ls", () => {
  const data = require("../bin/data.json");
  exec(`node bin/index.js ls`, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error：${error}`)
      return;
    }

    for (const key in data) {
      expect(stdout).toContain(data[key])
    }
  })
})

// test("j-nrm add", () => {
//   const key = "local";
//   const value = "http://127.0.0.1:7890"
//   exec(`node bin/index.js add ${key} ${value}`, (error, stdout, stderr) => {
//     if (error) {
//       console.log(`exec error：${error}`)
//       return;
//     }

//     expect(stdout).toContain("success added registry")

//     exec(`node bin/index.js ls`, (error, stdout, stderr) => {
//       if (error) {
//         console.log(`exec error：${error}`)
//         return;
//       }
  
//       expect(stdout).toContain(value)
//     })
//   })
// })

// test("j-nrm del", () => {
//   const key = "local"
//   exec(`node bin/index.js del ${key}`, (error, stdout, stderr) => {
//     if (error) {
//       console.log(`exec error：${error}`)
//       return;
//     }

//     expect(stdout).toContain("success deleted registry")

//     exec(`node bin/index.js ls`, (error, stdout, stderr) => {
//       if (error) {
//         console.log(`exec error：${error}`)
//         return;
//       }
  
//       expect(stdout).not.toContain(key)
//     })
//   })
// })


test("j-nrm use", () => {
  const data = require("../bin/data.json");
  const key = "yarn"
  exec(`node bin/index.js use ${key}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error：${error}`)
      return;
    }

    expect(stdout).toContain(`set registry success：${data[key]}`)

    exec(`npm config get registry`, (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error：${error}`)
        return;
      }
  
      expect(stdout).not.toContain(data[key])
    })
  })
})