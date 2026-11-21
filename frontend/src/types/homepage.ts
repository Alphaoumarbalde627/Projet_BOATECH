export type Category = {
  name: string
  image: string
}

export type Product = {
  name: string
  category: string
  price: number
  oldPrice?: number
  badge?: string
  image: string
  rating: number
}

export type Service = {
  title: string
  description: string
  icon: string
}

export type Training = {
  title: string
  level: string
  duration: string
  price: number
  badge?: string
  image: string
}

export type Testimonial = {
  quote: string
  author: string
  role: string
}

export type Commitment = {
  title: string
  description: string
  icon: string
}

export type HomePageData = {
  categories: Category[]
  products: Product[]
  services: Service[]
  trainings: Training[]
  testimonials: Testimonial[]
  commitments: Commitment[]
}
