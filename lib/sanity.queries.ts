import { client } from "@/sanity/lib/client"

export async function getEmployees() {
  return client.fetch(`
    *[_type == "employee"] {
      _id,
      name,
      position,
      "image": image.asset->url,
      bio,
      email,
      phone,
      expertise
    }
  `)
}

export async function getEquipment() {
  const query = `*[_type == "equipment"] {
    _id,
    name,
    category,
    description,
    "imageUrl": image.asset->url,
    price,
    specifications,
    available,
    quantity
  }`
  
  return client.fetch(query)
}