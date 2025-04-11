import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Dados das barras
const data = [
  { name: "Marketing", tasks: 10 },
  { name: "HR", tasks: 8 },
  { name: "Developers", tasks: 18 },
  { name: "Design", tasks: 12 },
];

// Cores por departamento
const barColors = {
  Marketing: "#facc15",
  HR: "#f97316",
  Developers: "#06b6d4",
  Design: "#8b5cf6",
};

export function TasksByProjectsChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="tasks"
          label={{ position: "top" }}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[entry.name]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}


// Dados do gráfico de pizza
const employeeData = [
  { name: "Active", value: 482 },
  { name: "Inactive", value: 254 },
];

// Cores do gráfico de pizza
const pieColors = ["#f97316", "#dc2626"];

export function EmployeeStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={employeeData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          label
        >
          {employeeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
