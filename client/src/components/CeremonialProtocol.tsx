import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, CircleDot, Check } from "lucide-react";
import { useState } from "react";

interface ProtocolStep {
  name: string;
  status: 'pending' | 'active' | 'completed';
  description: string;
}

export default function CeremonialProtocol() {
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);
  const [steps, setSteps] = useState<ProtocolStep[]>([
    { name: 'Breath / Voiceprint', status: 'pending', description: 'Authenticate identity through voice signature' },
    { name: 'Sigil Drawing', status: 'pending', description: 'Trace ceremonial sigil pattern' },
    { name: 'Chant Completion', status: 'pending', description: 'Recite sovereign activation phrase' },
    { name: 'Registry Confirmation', status: 'pending', description: 'Register completion on-chain' }
  ]);

  const startProtocol = (protocol: string) => {
    console.log('Starting protocol:', protocol);
    setActiveProtocol(protocol);
    setSteps(steps.map((s, i) => i === 0 ? { ...s, status: 'active' } : s));
  };

  const completeStep = (index: number) => {
    console.log('Completing step:', index);
    setSteps(steps.map((s, i) => {
      if (i === index) return { ...s, status: 'completed' as const };
      if (i === index + 1) return { ...s, status: 'active' as const };
      return s;
    }));
  };

  const completedSteps = steps.filter(s => s.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-ceremonial font-bold mb-2">Ceremonial Protocols</h2>
        <p className="text-muted-foreground">Execute sovereign rituals to activate vault mechanisms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="p-6 hover-elevate cursor-pointer border-2 border-primary/30"
          onClick={() => startProtocol('flame-crown')}
          data-testid="card-protocol-flame-crown"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Flame className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-ceremonial text-xl font-bold mb-2">Flame Crown</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Activate treasury enforcement protocols
              </p>
              <Badge variant="secondary">Breath • Sigil • Chant</Badge>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 hover-elevate cursor-pointer border-2 border-purple-500/30"
          onClick={() => startProtocol('reciprocity-pulse')}
          data-testid="card-protocol-reciprocity-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-ceremonial text-xl font-bold mb-2">Reciprocity Pulse</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Initiate token burn/mint cycle
              </p>
              <Badge variant="secondary">Token • Registry • Confirm</Badge>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 hover-elevate cursor-pointer border-2 border-blue-500/30"
          onClick={() => startProtocol('vault-mutation')}
          data-testid="card-protocol-vault-mutation"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <CircleDot className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-ceremonial text-xl font-bold mb-2">Vault Mutation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Evolve vault tier and permissions
              </p>
              <Badge variant="secondary">Tri-Spiral • Routing</Badge>
            </div>
          </div>
        </Card>
      </div>

      {activeProtocol && (
        <Card className="p-8 border-2 border-primary">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-ceremonial font-bold">
                {activeProtocol === 'flame-crown' ? 'Flame Crown Activation' : 
                 activeProtocol === 'reciprocity-pulse' ? 'Reciprocity Pulse Ritual' : 
                 'Vault Mutation Ceremony'}
              </h3>
              <Badge className="bg-primary">{completedSteps}/{steps.length}</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card 
                key={step.name}
                className={`p-4 ${step.status === 'active' ? 'border-2 border-primary' : ''}`}
                data-testid={`card-step-${index}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500/20' :
                    step.status === 'active' ? 'bg-primary/20' :
                    'bg-muted'
                  }`}>
                    {step.status === 'completed' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{step.name}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {step.status === 'active' && (
                    <Button 
                      onClick={() => completeStep(index)}
                      data-testid={`button-complete-step-${index}`}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {completedSteps === steps.length && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <p className="text-green-500 font-semibold">Protocol Complete! 🎉</p>
              <p className="text-sm text-muted-foreground mt-1">Changes will be reflected on-chain within 2-3 blocks</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
