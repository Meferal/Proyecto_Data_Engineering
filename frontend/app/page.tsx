"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Send, ChefHat, Sparkles, Loader2, Calendar, UtensilsCrossed, Trash2 } from "lucide-react"

// URL de la API (Local o Nube)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// --- TIPOS ---
interface RecetaData {
  id: number
  fecha: string
  ingredientes: string
  receta_generada: string
}

// --- COMPONENTES UI PERSONALIZADOS ---
const Button = ({ children, onClick, disabled, className, variant = "default" }: any) => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
  const variants: any = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
  }
  return <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>{children}</button>
}

const Textarea = ({ value, onChange, placeholder }: any) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
  />
)

const Card = ({ children, className }: any) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
    {children}
  </div>
)

// --- PÁGINA PRINCIPAL ---
export default function ChefDashboard() {
  const [ingredientes, setIngredientes] = useState("")
  const [receta, setReceta] = useState("")
  const [loading, setLoading] = useState(false)
  const [historial, setHistorial] = useState<RecetaData[]>([])

  const cargarHistorial = async () => {
    try {
      const res = await fetch(`${API_URL}/api/historial?limit=20`)
      if (res.ok) {
        const data = await res.json()
        setHistorial(data)
      }
    } catch (error) { console.error(error) }
  }

  useEffect(() => { cargarHistorial() }, [])

  const handleGenerar = async () => {
    if (!ingredientes.trim()) return
    setLoading(true)
    setReceta("")
    try {
      const response = await fetch(`${API_URL}/api/generar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientes }),
      })
      if (!response.ok) throw new Error("Error")
      const data = await response.json()
      setReceta(data.receta_generada || data.receta)
      cargarHistorial()
    } catch (error) {
      setReceta("⚠️ Error de conexión con el Chef.")
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40 font-sans text-slate-900">
      
      {/* SIDEBAR OSCURA */}
      <aside className="hidden w-64 flex-col border-r bg-[#18181b] text-white md:flex flex-shrink-0">
        <div className="flex h-14 items-center border-b border-[#27272a] px-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <ChefHat className="h-6 w-6 text-emerald-500" />
            <span>Chef IA</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium gap-1">
            <div className="px-3 py-2 text-[#a1a1aa] text-xs uppercase font-bold tracking-wider mb-2">
              Historial Reciente
            </div>
            {historial.map((item) => (
              <div 
                key={item.id} 
                onClick={() => { setIngredientes(item.ingredientes); setReceta(item.receta_generada) }}
                className="group flex flex-col gap-1 rounded-md px-3 py-2 text-[#d4d4d8] hover:bg-[#27272a] hover:text-white transition-all cursor-pointer border border-transparent"
              >
                <span className="truncate w-full font-medium">{item.ingredientes}</span>
                <span className="text-[10px] text-[#71717a] flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {new Date(item.fecha).toLocaleDateString()}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6 shadow-sm flex-shrink-0">
          <h1 className="text-lg font-semibold md:text-xl flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-emerald-600" />
            Cocina Inteligente
          </h1>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto">
            
            {/* INPUT */}
            <Card className="col-span-1 shadow-sm bg-white">
              <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  Ingredientes
                </h3>
                <p className="text-sm text-muted-foreground">¿Qué tienes disponible?</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <Textarea 
                  placeholder="Ej: Pollo, arroz, limón..." 
                  value={ingredientes}
                  onChange={(e: any) => setIngredientes(e.target.value)}
                />
                <Button onClick={handleGenerar} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cocinando...</> : <><Send className="mr-2 h-4 w-4" /> Generar Receta</>}
                </Button>
              </div>
            </Card>

            {/* RESULTADO */}
            <Card className="col-span-1 md:col-span-1 lg:col-span-2 shadow-sm min-h-[500px] flex flex-col bg-white">
              <div className="flex flex-col space-y-1.5 p-6 pb-2 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold leading-none tracking-tight">Receta Generada</h3>
                  {receta && <Button variant="ghost" onClick={() => setReceta("")} className="h-8 text-xs text-muted-foreground"><Trash2 className="h-4 w-4 mr-1"/> Limpiar</Button>}
                </div>
              </div>
              
              <div className="p-6 flex-1 overflow-auto">
                {receta ? (
                  /* DIV CONTENEDOR PARA ESTILOS DE TEXTO */
                  <div className="text-sm leading-relaxed text-slate-700">
                    <ReactMarkdown 
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-slate-900 border-b pb-2 mt-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 text-slate-800" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-slate-800" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 text-slate-600" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 mb-4 marker:text-emerald-500" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
                      }}
                    >
                      {receta}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-40 space-y-4 mt-20">
                    <ChefHat className="h-16 w-16" />
                    <p className="text-sm">La magia ocurrirá aquí...</p>
                  </div>
                )}
              </div>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}
