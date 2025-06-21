import { revalidatePath } from 'next/cache'
import { neon } from '@neondatabase/serverless'
const sql = neon(`${process.env.DATABASE_URL}`)
export default async function Page() {
  const result = await sql`SELECT * FROM users`;
  async function createAction(formData: FormData) {
    'use server'
    const userName = formData.get('userName')
    const userAge = formData.get('userAge')
    const address = formData.get('address')
    await sql`INSERT INTO users (userName,userAge,address) VALUES (${userName}, ${userAge},${address})`;
    revalidatePath('/')
  }
  return (
    <div>
      hello page 01
      <div>
        <form action={createAction}>
          <div>
            用户名：<input className="border" type="text" name="userName" />
          </div>
          <div>
            年龄：<input className="border" type="text" name="userAge" />
          </div>
           <div>
            地址：<input className="border" type="text" name="address" />
          </div>
          <button type="submit">注册</button>
        </form>
      </div>
      <ul>
        { result.map(item => <li key={item.id}>{item.username}, {item.password},{item.address}</li>) }
      </ul>
    </div>
  )
}
