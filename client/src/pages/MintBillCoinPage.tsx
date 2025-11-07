import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Coins, Banknote, Wallet, Shield, TrendingUp, Loader2 } from "lucide-react";
import type { TreasuryVault } from "@shared/schema";

const denominationValues = {
  BLEU: 10000,
  PINK: 1000,
  SHILLS: 100,
};

const billSchema = z.object({
  vaultId: z.string().min(1, "Please select a vault"),
  ownerAddress: z.string().min(1, "Wallet address is required").regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  denomination: z.enum(["BLEU", "PINK", "SHILLS"]),
});

type BillFormData = z.infer<typeof billSchema>;

export default function MintBillCoinPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"bill" | "coin">("bill");

  const { data: vaults } = useQuery<TreasuryVault[]>({
    queryKey: ["/api/treasury-vaults"],
  });

  const billForm = useForm<BillFormData>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      vaultId: "",
      ownerAddress: "",
      denomination: "BLEU",
    },
  });

  const coinForm = useForm<BillFormData>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      vaultId: "",
      ownerAddress: "",
      denomination: "BLEU",
    },
  });

  const billMutation = useMutation({
    mutationFn: async (data: BillFormData) => {
      return await apiRequest("/api/bills/mint", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Bill Minted Successfully",
        description: `${data.denomination} bill created with value $${data.usdValue?.toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enft-registry"] });
      billForm.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error.message || "Failed to mint bill",
      });
    },
  });

  const coinMutation = useMutation({
    mutationFn: async (data: BillFormData) => {
      return await apiRequest("/api/coins/mint", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Coin Minted Successfully",
        description: `${data.denomination} coin created with value $${data.usdValue?.toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enft-registry"] });
      coinForm.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error.message || "Failed to mint coin",
      });
    },
  });

  const getDenominationColor = (denomination: string): string => {
    switch (denomination) {
      case "BLEU":
        return "bg-blue-500/10 border-blue-500/30 text-blue-500";
      case "PINK":
        return "bg-pink-500/10 border-pink-500/30 text-pink-500";
      case "SHILLS":
        return "bg-amber-500/10 border-amber-500/30 text-amber-500";
      default:
        return "";
    }
  };

  const renderForm = (form: typeof billForm, mutation: typeof billMutation, type: "bill" | "coin") => {
    const Icon = type === "bill" ? Banknote : Coins;
    const selectedDenomination = form.watch("denomination");

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="vaultId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treasury Vault</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-vault">
                        <SelectValue placeholder="Select vault" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vaults?.map((vault) => (
                        <SelectItem key={vault.id} value={vault.id || ""}>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>{vault.vaultName}</span>
                            <Badge variant="outline" className="text-xs">
                              {vault.fibonacciWeight}x
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="0x..."
                        className="pl-10"
                        data-testid="input-owner-address"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="denomination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Denomination</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  {(Object.keys(denominationValues) as Array<keyof typeof denominationValues>).map((denom) => (
                    <button
                      key={denom}
                      type="button"
                      onClick={() => field.onChange(denom)}
                      className={`
                        p-4 rounded-lg border-2 transition-all hover-elevate active-elevate-2
                        ${field.value === denom 
                          ? `${getDenominationColor(denom)} border-opacity-100` 
                          : 'border-border bg-card hover:bg-accent'
                        }
                      `}
                      data-testid={`button-denomination-${denom.toLowerCase()}`}
                    >
                      <div className="text-center space-y-2">
                        <Icon className="w-8 h-8 mx-auto" />
                        <div className="font-bold text-lg">{denom}</div>
                        <div className="text-sm text-muted-foreground">
                          ${denominationValues[denom].toLocaleString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card className={getDenominationColor(selectedDenomination)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Selected Value</p>
                  <p className="text-2xl font-bold">
                    ${denominationValues[selectedDenomination].toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={mutation.isPending}
            data-testid={`button-mint-${type}`}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Minting {type}...
              </>
            ) : (
              <>
                <Icon className="w-4 h-4 mr-2" />
                Mint {type.charAt(0).toUpperCase() + type.slice(1)}
              </>
            )}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Coins className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight" data-testid="text-page-title">
              Mint Bills & Coins
            </h1>
            <p className="text-muted-foreground text-lg">
              Create ceremonial currency with IPFS metadata
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Banknote className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">BLEU</p>
                  <p className="text-xl font-bold">$10,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <Banknote className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">PINK</p>
                  <p className="text-xl font-bold">$1,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Coins className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SHILLS</p>
                  <p className="text-xl font-bold">$100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "bill" | "coin")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bill" data-testid="tab-bill">
            <Banknote className="w-4 h-4 mr-2" />
            Bills
          </TabsTrigger>
          <TabsTrigger value="coin" data-testid="tab-coin">
            <Coins className="w-4 h-4 mr-2" />
            Coins
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bill">
          <Card>
            <CardHeader>
              <CardTitle>Mint Ceremonial Bill</CardTitle>
              <CardDescription>
                Create a BLEULIONTREASURY bill as an ERC-721 token with IPFS metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderForm(billForm, billMutation, "bill")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coin">
          <Card>
            <CardHeader>
              <CardTitle>Mint Ceremonial Coin</CardTitle>
              <CardDescription>
                Create a BLEULIONTREASURY coin as an ERC-721 token with IPFS metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderForm(coinForm, coinMutation, "coin")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
