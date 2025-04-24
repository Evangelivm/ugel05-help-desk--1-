// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"

// // Sample performance data
// const performanceData = [
//   {
//     id: 1,
//     name: "Juan Pérez",
//     avatar: null,
//     resolvedTickets: 42,
//     averageResolutionTime: "1.5h",
//     satisfactionRate: 95,
//     firstResponseTime: "15min",
//     reopenedTickets: 2,
//     performance: 92,
//   },
//   {
//     id: 2,
//     name: "María López",
//     avatar: null,
//     resolvedTickets: 38,
//     averageResolutionTime: "1.8h",
//     satisfactionRate: 90,
//     firstResponseTime: "12min",
//     reopenedTickets: 3,
//     performance: 88,
//   },
//   {
//     id: 3,
//     name: "Carlos Mendoza",
//     avatar: null,
//     resolvedTickets: 45,
//     averageResolutionTime: "1.2h",
//     satisfactionRate: 98,
//     firstResponseTime: "10min",
//     reopenedTickets: 1,
//     performance: 96,
//   },
//   {
//     id: 4,
//     name: "Ana García",
//     avatar: null,
//     resolvedTickets: 50,
//     averageResolutionTime: "1.0h",
//     satisfactionRate: 97,
//     firstResponseTime: "8min",
//     reopenedTickets: 0,
//     performance: 98,
//   },
//   {
//     id: 5,
//     name: "Roberto Díaz",
//     avatar: null,
//     resolvedTickets: 30,
//     averageResolutionTime: "2.0h",
//     satisfactionRate: 85,
//     firstResponseTime: "20min",
//     reopenedTickets: 4,
//     performance: 80,
//   },
//   {
//     id: 6,
//     name: "Laura Sánchez",
//     avatar: null,
//     resolvedTickets: 40,
//     averageResolutionTime: "1.6h",
//     satisfactionRate: 92,
//     firstResponseTime: "14min",
//     reopenedTickets: 2,
//     performance: 90,
//   },
//   {
//     id: 7,
//     name: "Miguel Torres",
//     avatar: null,
//     resolvedTickets: 35,
//     averageResolutionTime: "1.9h",
//     satisfactionRate: 88,
//     firstResponseTime: "18min",
//     reopenedTickets: 3,
//     performance: 85,
//   },
//   {
//     id: 8,
//     name: "Carmen Flores",
//     avatar: null,
//     resolvedTickets: 43,
//     averageResolutionTime: "1.4h",
//     satisfactionRate: 94,
//     firstResponseTime: "13min",
//     reopenedTickets: 1,
//     performance: 93,
//   },
// ]

// // Performance indicator component
// const PerformanceIndicator = ({ value }: { value: number }) => {
//   let color = "bg-green-500"

//   if (value < 80) {
//     color = "bg-red-500"
//   } else if (value < 90) {
//     color = "bg-yellow-500"
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <Progress value={value} className="h-2" indicatorClassName={color} />
//       <span className="text-xs font-medium">{value}%</span>
//     </div>
//   )
// }

// export function AdminTechnicianPerformance() {
//   const [timeRange, setTimeRange] = useState("month")

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-end">
//         <div className="w-48">
//           <Select value={timeRange} onValueChange={setTimeRange}>
//             <SelectTrigger>
//               <SelectValue placeholder="Periodo de tiempo" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="week">Última semana</SelectItem>
//               <SelectItem value="month">Último mes</SelectItem>
//               <SelectItem value="quarter">Último trimestre</SelectItem>
//               <SelectItem value="year">Último año</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Promedio de resolución</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1.5h</div>
//             <p className="text-xs text-muted-foreground">-0.2h desde el mes pasado</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Satisfacción del usuario</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">92%</div>
//             <p className="text-xs text-muted-foreground">+2% desde el mes pasado</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Tiempo de primera respuesta</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">14min</div>
//             <p className="text-xs text-muted-foreground">-1min desde el mes pasado</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Tickets reabiertos</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">2%</div>
//             <p className="text-xs text-muted-foreground">-0.5% desde el mes pasado</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[200px]">Técnico</TableHead>
//               <TableHead className="w-[100px]">Tickets resueltos</TableHead>
//               <TableHead className="w-[120px]">Tiempo promedio</TableHead>
//               <TableHead className="w-[120px]">Satisfacción</TableHead>
//               <TableHead className="w-[120px]">Primera respuesta</TableHead>
//               <TableHead className="w-[100px]">Reabiertos</TableHead>
//               <TableHead>Rendimiento general</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {performanceData.map((technician) => (
//               <TableRow key={technician.id}>
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-8 w-8 border border-gray-200">
//                       <AvatarImage
//                         src={technician.avatar || "/placeholder.svg?height=32&width=32"}
//                         alt={technician.name}
//                       />
//                       <AvatarFallback className="bg-red-50 text-red-700 text-xs">
//                         {technician.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="font-medium">{technician.name}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{technician.resolvedTickets}</TableCell>
//                 <TableCell>{technician.averageResolutionTime}</TableCell>
//                 <TableCell>{technician.satisfactionRate}%</TableCell>
//                 <TableCell>{technician.firstResponseTime}</TableCell>
//                 <TableCell>{technician.reopenedTickets}</TableCell>
//                 <TableCell>
//                   <PerformanceIndicator value={technician.performance} />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }
