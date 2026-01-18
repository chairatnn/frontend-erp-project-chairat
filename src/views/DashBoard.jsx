"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const chartData = [
  { month: "January", online: 186, offline: 80 },
  { month: "February", online: 305, offline: 200 },
  { month: "March", online: 237, offline: 120 },
  { month: "April", online: 73, offline: 190 },
  { month: "May", online: 209, offline: 130 },
  { month: "June", online: 214, offline: 140 },
];

const chartConfig = {
  online: {
    label: "Online",
    color: "#2C73D2",
  },
  offline: {
    label: "Offline",
    color: "#845EC2",
  },
};

const chartData2 = [
  { browser: "productA", products: 275, fill: "var(--color-productA)" },
  { browser: "productB", products: 200, fill: "var(--color-productB)" },
  { browser: "productC", products: 187, fill: "var(--color-productC)" },
  { browser: "productD", products: 173, fill: "var(--color-productD)" },
  { browser: "productE", products: 90, fill: "var(--color-productE)" },
];
const chartConfig2 = {
  products: {
    label: "Products",
  },
  productA: {
    label: "Product-A",
    color: "#2C73D2",
  },
  productB: {
    label: "Product-B",
    color: "#079773",
  },
  productC: {
    label: "Product-C",
    color: "#b89e7b",
  },
  productD: {
    label: "Product-D",
    color: "#706868",
  },
  productE: {
    label: "Product-E",
    color: "#845EC2",
  },
};

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

const chartData3 = [
  { region: "North", revenue: 186 },
  { region: "East", revenue: 305 },
  { region: "Northeast", revenue: 237 },
  { region: "South", revenue: 273 },
  { region: "West", revenue: 209 },
  { region: "Central", revenue: 214 },
];
const chartConfig3 = {
  revenue: {
    label: "Revenue",
    color: "##0081CF",
  },
};

export default function DashBoard () {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <h1 className="text-xl md:text-2xl font-bold text-center md:text-left px-2 py-4">
        Financial Analysis
      </h1>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="online" fill="var(--color-online)" radius={4} />
        <Bar dataKey="offline" fill="var(--color-offline)" radius={4} />
      </BarChart>

      <Card className="flex flex-col bg-gradient-to-br from-sage-dark to-blue-600">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Product List</CardTitle>
          <CardDescription>January - June 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig2}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-62.5]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="products" hideLabel />}
              />
              <Pie data={chartData2} dataKey="products">
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value) => chartConfig2[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-black leading-none">
            Showing total Products for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-sage-dark to-blue-600">
        <CardHeader className="items-center">
          <CardTitle>Radar Chart - Regions</CardTitle>
          <CardDescription>
            January - June 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer
            config={chartConfig3}
            className="[mx-auto aspect-square max-h-62.5]"
          >
            <RadarChart data={chartData3}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="region" />
              <PolarGrid />
              <Radar
                dataKey="revenue"
                fill="#845EC2"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-black flex items-center gap-2 leading-none">
            Showing total revenue by regions for the last 6 months
          </div>
        </CardFooter>
      </Card>


    </ChartContainer>
  );
}
