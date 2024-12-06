import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

// AWS S3 configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const uploadFileToS3 = async (file) => {
  const bucketName = process.env.AWS_BUCKET_NAME
  const fileExtension = file.mimetype.split('/')[1]
  const fileName = `file-${Date.now()}.${fileExtension}`

  const params = {
    Bucket: bucketName,
    Key: fileName, // The file path in the S3 bucket
    Body: file.buffer, // The file content (as a buffer)
    ContentType: file.mimetype // The MIME type of the file
  }

  try {
    await s3Client.send(new PutObjectCommand(params))

    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
  } catch (error) {
    console.log(error)

    throw new Error('Error uploading file to S3')
  }
}

export const uploadFileToStorage = async (req, res) => {
  try {
    // Assuming you're using a middleware like `multer` to handle file uploads in Express
    const file = req.file
    if (!file) {
      return res.status(400).json({ message: 'No file provided' })
    }

    // Call the S3 upload function
    const fileUrl = await uploadFileToS3(file)

    // Respond with the file URL
    res.status(200).json({ message: 'File uploaded successfully', fileUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to upload file' })
  }
}
