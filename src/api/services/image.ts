import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getUserById, updateUser } from './user'
import { UserDto } from '../../domain/user/dto'

export async function uploadUserImage(id: number, image: any) {
  try {
    const user = await getUserById(id as number)
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      },
    })

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: image?.filename,
      Body: await image?.toBuffer(),
      ContentType: image?.mimetype,
    })

    await s3.send(putObjectCommand)

    user.image = `https://${process.env.AWS_BUCKET}.s3.eu-west-3.amazonaws.com/${image?.filename}`
    const updatedUser = await updateUser(id, user as UserDto)

    return updatedUser
  } catch (error) {
    throw error
  }
}
