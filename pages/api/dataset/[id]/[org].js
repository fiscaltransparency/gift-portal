import { Storage } from '@google-cloud/storage'
import { initializeApollo } from '../../../../lib/apolloClient'
import Metastore from '../../../../lib/Metastore'
import { SINGLE_REPOSITORY } from '../../../../lib/queries'
import { PERMISSIONS } from '../../../../lib/queries'
import Permissions from '../../../../lib/Permissions'
import { decrypt } from '../../../../lib/jwt'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  try {

  const apolloClient = initializeApollo()
  await apolloClient.query({query: PERMISSIONS})
//   const permissions = new Permissions(apolloClient.cache.extract())
  res.status(200).send("In here");
  }
  catch(error){
    res.status(200).send(error);
  }

  try {
    const { id, org} = req.query
//     const { userInfo } = req.cookies
//     const user = decrypt(userInfo) || { login: 'PUBLIC'}
//     const { id, org} = req.query
//     const organization = org.split('.')[0]
//     if (!await permissions.userHasPermission(user.login, organization, 'read')) {
//       res.status(401).send('Unauthorized User')
//     }

//     //obtain organization datajson and resources from github
//     const apolloClientG = initializeApollo()

//     await apolloClientG.query({
//       query: SINGLE_REPOSITORY,
//       variables: { name: organization },
//     })

//     const metastore = new Metastore(apolloClientG.cache.extract())
//     const dataset = await metastore.fetch(organization)
//     //load google cloud storage
//     const storage = new Storage({
//       projectId: process.env.PROJECT_ID,
//       credentials: getDecryptedSecret()})

//     const bucketName = "gift-datasets2"
//     let bucket = storage.bucket(bucketName)

//     let operationUser = uuidv4()


//     let newFileStorage = []

//     for(let i=0; i< dataset['resources'].length; i++) {

//       let resource = dataset['resources'][i]
//       let fname = `gift-data/${id}/${resource.hash}`

//       if (i > 0) fname = `gift-data/copy/${resource.hashcopy}`

//       newFileStorage.push(bucket.file(fname))
//     }

//     const mergeFile = bucket.file(`gift-data/${operationUser}/${org}`)
//     await bucket.combine(newFileStorage, mergeFile)

//     await downloadv2(mergeFile, res)
    // download(mergeFile, res).then(res => {
    //   mergeFile.delete()
    // })

  } catch(error) {
    res.status(400).send(`Error on Retrieve Resource: ${error.message}`)
  }

}

async function download(mergeFile, res){
  let [metaData] = await mergeFile.getMetadata()
  res.redirect(metaData.mediaLink)
}

async function downloadv2(mergeFile, res) {
  const [signedUrl] = await mergeFile.getSignedUrl({
    action: "read",
    expires: Date.now() + 15 * 60 * 1000,
  })
  res.redirect(signedUrl)
}
