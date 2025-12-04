"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown" // <--- LA CLAVE PARA EL FORMATO
import { Send, ChefHat, Sparkles, Loader2, History, UtensilsCrossed, Calendar, Trash2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// --- TIPOS ---
interface RecetaData {
  id: number
  fecha: string
  ingredientes: string
  receta_generada: string
}

// --- COMPONENTES VISUALES ---
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

// --- DASHBOARD PRINCIPAL ---
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
    <div className="flex min-h-screen w-full bg-muted/40 font-sans">
      
      {/* SIDEBAR OSCURA (Estilo V0 Original) */}
      <aside className="hidden w-64 flex-col border-r bg-[#18181b] text-white md:flex">
        <div className="flex h-14 items-center border-b border-[#27272a] px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <ChefHat className="h-6 w-6 text-emerald-500" />
            <span>Chef IA</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            <div className="px-3 py-2 text-[#a1a1aa] text-xs uppercase font-bold tracking-wider mb-2">
              Historial
            </div>
            {historial.map((item) => (
              <div 
                key={item.id} 
                onClick={() => { setIngredientes(item.ingredientes); setReceta(item.receta_generada) }}
                className="group flex flex-col gap-1 rounded-md px-3 py-2 text-[#d4d4d8] hover:bg-[#27272a] hover:text-white transition-all cursor-pointer"
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
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 shadow-sm sticky top-0 z-10">
          <h1 className="text-lg font-semibold md:text-xl flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
            Generador de Recetas Inteligente
          </h1>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-hidden">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-full items-start">
            
            {/* CARD INPUT */}
            <Card className="col-span-1 shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  Ingredientes
                </h3>
                <p className="text-sm text-muted-foreground">¿Qué hay en tu nevera?</p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <Textarea 
                  placeholder="Ej: Pollo, chorizo, cebolla, leche..." 
                  value={ingredientes}
                  onChange={(e: any) => setIngredientes(e.target.value)}
                />
                <Button onClick={handleGenerar} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cocinando...</> : <><Send className="mr-2 h-4 w-4" /> Generar Receta</>}
                </Button>
              </div>
            </Card>

            {/* CARD RESULTADO (CON MARKDOWN REAL) */}
            <Card className="col-span-1 md:col-span-1 lg:col-span-2 shadow-sm h-full min-h-[500px] flex flex-col bg-white">
              <div className="flex flex-col space-y-1.5 p-6 pb-2 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold leading-none tracking-tight">Resultado</h3>
                  {receta && <Button variant="ghost" onClick={() => setReceta("")} className="h-8 text-xs text-muted-foreground"><Trash2 className="h-4 w-4 mr-1"/> Limpiar</Button>}
                </div>
              </div>
              
              <div className="p-6 flex-1 overflow-auto">
                {receta ? (
                  // CORRECCIÓN: Movemos las clases a un DIV padre
                  <div className="prose prose-sm max-w-none prose-headings:text-emerald-800 prose-strong:text-emerald-700 prose-strong:font-bold prose-li:marker:text-emerald-500">
                    <ReactMarkdown 
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-foreground border-b pb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 text-foreground" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-foreground" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 mb-4" {...props} />,
                        li: ({node, ...props}) => <li className="text-muted-foreground" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                      }}
                    >
                      {receta}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-40 space-y-4">
                    <ChefHat className="h-16 w-16" />
                    <p className="text-sm">La receta mágica aparecerá aquí...</p>
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
