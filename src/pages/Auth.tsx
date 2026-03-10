import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmedAge, setConfirmedAge] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();

  const canSignUp = agreedToTerms && confirmedAge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (showReset) {
      const { error } = await resetPassword(email);
      setLoading(false);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Check your email', description: 'We sent you a password reset link.' });
        setShowReset(false);
      }
      return;
    }

    const { error } = isLogin ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else if (!isLogin) {
      toast({ title: 'Check your email', description: 'We sent you a confirmation link to verify your account.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-5xl mb-2">🥦</div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Happy Little Bites
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {showReset
              ? 'Enter your email to reset your password'
              : isLogin
                ? 'Welcome back! Sign in to your account'
                : 'Start your free month — no credit card needed'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {!showReset && (
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            )}

            {!isLogin && !showReset && (
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="age"
                    checked={confirmedAge}
                    onCheckedChange={(checked) => setConfirmedAge(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="age" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                    I confirm I am 18 years of age or older
                  </label>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || (!isLogin && !showReset && !canSignUp)}>
              {loading
                ? '...'
                : showReset
                  ? 'Send Reset Link'
                  : isLogin
                    ? 'Sign In'
                    : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            {!showReset && (
              <button
                onClick={() => setShowReset(true)}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Forgot password?
              </button>
            )}
            <div>
              <button
                onClick={() => { setShowReset(false); setIsLogin(!isLogin); setAgreedToTerms(false); setConfirmedAge(false); }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                {showReset
                  ? 'Back to sign in'
                  : isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}