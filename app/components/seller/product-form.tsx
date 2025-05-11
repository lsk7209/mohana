"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductForm({ editMode = false, productData = null }) {
  const [activeTab, setActiveTab] = useState("basic")
  const [expandedSection, setExpandedSection] = useState<string | null>("basic")
  const router = useRouter()
  const { toast } = useToast()
  const [images, setImages] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(editMode && productData?.image ? productData.image : null)
  const [formData, setFormData] = useState({
    title: editMode && productData ? productData.title : "",
    category: editMode && productData ? productData.category : "",
    format: editMode && productData ? productData.format : "오프라인",
    description: editMode && productData ? productData.description : "",
    summary: editMode && productData ? productData.summary : "",
    price: editMode && productData ? productData.price : "",
    priceType: editMode && productData ? productData.priceType : "per_person",
    minParticipants: editMode && productData ? productData.minParticipants : "",
    maxParticipants: editMode && productData ? productData.maxParticipants : "",
    duration: editMode && productData ? productData.duration : "",
  })

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setImages([file])
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImages([])
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.title || !formData.category || !formData.description || !formData.price || 
        !formData.minParticipants || !formData.maxParticipants || !formData.duration || !imagePreview) {
      toast({
        title: "입력 오류",
        description: "모든 필수 항목을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would submit the form data to the server
    toast({
      title: editMode ? "상품 수정 완료" : "상품 등록 완료",
      description: editMode 
        ? "상품이 수정되었습니다. 관리자 검수 후 프론트페이지에 반영됩니다." 
        : "상품이 등록되었습니다. 관리자 검수 후 프론트페이지에 반영됩니다.",
    })

    // Redirect to products page
    setTimeout(() => {
      router.push("/seller/products")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">기본정보</TabsTrigger>
          <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
          <TabsTrigger value="price">가격정보</TabsTrigger>
          <TabsTrigger value="media">미디어</TabsTrigger>
          <TabsTrigger value="preparation">준비사항</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <div className="mb-8">
        { /*
