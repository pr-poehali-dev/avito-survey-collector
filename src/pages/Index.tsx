import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  purpose: string;
  reviewsCount: string;
  rating: string;
  accountAge: string;
  mainAds: string;
  monthlyLoss: string;
  budget: string;
  phone: string;
  messenger: string;
}

const Index = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    reviewsCount: '',
    rating: '',
    accountAge: '',
    mainAds: '',
    monthlyLoss: '',
    budget: '',
    phone: '',
    messenger: '',
  });
  const { toast } = useToast();

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 7 && formData.budget === 'less-7000') {
      setDirection('forward');
      setStep(9);
      return;
    }
    setDirection('forward');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection('backward');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.purpose !== '';
      case 2: return formData.reviewsCount !== '';
      case 3: return formData.rating !== '';
      case 4: return formData.accountAge !== '';
      case 5: return formData.mainAds !== '';
      case 6: return formData.monthlyLoss !== '';
      case 7: return formData.budget !== '';
      case 8: return formData.phone !== '' && formData.messenger !== '';
      default: return true;
    }
  };

  const getBackgroundForStep = () => {
    const backgrounds = [
      'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50',
      'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50',
      'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50',
      'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
      'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50',
      'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50',
      'bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50',
      'bg-gradient-to-br from-red-50 via-pink-50 to-rose-50',
    ];
    return backgrounds[step - 1] || backgrounds[0];
  };

  return (
    <div className={`min-h-screen ${getBackgroundForStep()} relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-700`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Восстановление аккаунта Авито
          </h1>
          <p className="text-muted-foreground text-lg">
            Ответьте на несколько вопросов для оценки ситуации
          </p>
        </div>

        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Шаг {step > 8 ? 8 : step} из {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-2xl border-2 backdrop-blur-sm bg-white/95 hover:shadow-[0_20px_70px_-15px_rgba(139,92,246,0.3)] transition-all duration-500">
          <div
            key={step}
            className={direction === 'forward' ? 'animate-slide-in' : 'animate-slide-out'}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="Target" className="text-primary" size={28} />
                    Для чего вы использовали аккаунт?
                  </h2>
                </div>
                <RadioGroup value={formData.purpose} onValueChange={(v) => updateFormData('purpose', v)}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="cursor-pointer text-lg flex-1">
                      Для заработка
                    </Label>
                    <Icon name="DollarSign" className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="cursor-pointer text-lg flex-1">
                      Для себя
                    </Label>
                    <Icon name="User" className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="MessageSquare" className="text-primary" size={28} />
                    Сколько было отзывов на аккаунте?
                  </h2>
                  <p className="text-muted-foreground">Укажите примерное количество</p>
                </div>
                <Input
                  type="number"
                  placeholder="Например: 150"
                  value={formData.reviewsCount}
                  onChange={(e) => updateFormData('reviewsCount', e.target.value)}
                  className="text-lg p-6 transition-all duration-300 focus:scale-[1.01] focus:shadow-lg"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="Star" className="text-primary" size={28} />
                    Рейтинг профиля до блокировки?
                  </h2>
                </div>
                <RadioGroup value={formData.rating} onValueChange={(v) => updateFormData('rating', v)}>
                  {[
                    { value: '1-3', label: '1-3 звезды', icon: 'TrendingDown' },
                    { value: '4+', label: '4+ звезды', icon: 'TrendingUp' },
                    { value: '5', label: '5 звёзд', icon: 'Award' },
                    { value: 'none', label: 'Не было рейтинга', icon: 'Minus' },
                    { value: 'unknown', label: 'Не помню даже примерно', icon: 'HelpCircle' },
                  ].map((item, index) => (
                    <div 
                      key={item.value} 
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value} className="cursor-pointer text-lg flex-1">
                        {item.label}
                      </Label>
                      <Icon name={item.icon as any} className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="Calendar" className="text-primary" size={28} />
                    Сколько лет вашему аккаунту?
                  </h2>
                  <p className="text-muted-foreground">Укажите возраст аккаунта в годах</p>
                </div>
                <Input
                  type="number"
                  placeholder="Например: 3"
                  value={formData.accountAge}
                  onChange={(e) => updateFormData('accountAge', e.target.value)}
                  className="text-lg p-6"
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="Package" className="text-primary" size={28} />
                    Основные объявления?
                  </h2>
                  <p className="text-muted-foreground">Что вы продавали/предлагали?</p>
                </div>
                <Input
                  type="text"
                  placeholder="Например: Электроника, мебель"
                  value={formData.mainAds}
                  onChange={(e) => updateFormData('mainAds', e.target.value)}
                  className="text-lg p-6"
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="TrendingDown" className="text-primary" size={28} />
                    Ежемесячный ущерб от блокировки
                  </h2>
                  <p className="text-muted-foreground">Для аргументации в Авито</p>
                </div>
                <RadioGroup value={formData.monthlyLoss} onValueChange={(v) => updateFormData('monthlyLoss', v)}>
                  {[
                    { value: '100k+', label: 'более 100.000' },
                    { value: '50-100k', label: '50.000 - 100.000' },
                    { value: '25-50k', label: '25.000 - 50.000' },
                    { value: '15-25k', label: '15.000 - 25.000' },
                    { value: '5-15k', label: '5.000 - 15.000' },
                    { value: '<5k', label: 'до 5.000' },
                    { value: 'none', label: 'Ежемес.ущерба нет/Есть разовый' },
                  ].map((item) => (
                    <div key={item.value} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-all cursor-pointer">
                      <RadioGroupItem value={item.value} id={`loss-${item.value}`} />
                      <Label htmlFor={`loss-${item.value}`} className="cursor-pointer text-lg flex-1">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="Wallet" className="text-primary" size={28} />
                    Ваш бюджет на восстановление?
                  </h2>
                </div>
                <RadioGroup value={formData.budget} onValueChange={(v) => updateFormData('budget', v)}>
                  {[
                    { value: '100k+', label: '100.000+' },
                    { value: '50-100k', label: '50.000 - 100.000' },
                    { value: '15-30k', label: '15.000 - 30.000' },
                    { value: '7-15k', label: '7.000 - 15.000' },
                    { value: 'less-7000', label: 'Меньше 7.000 или не готов платить' },
                  ].map((item) => (
                    <div key={item.value} className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-all cursor-pointer">
                      <RadioGroupItem value={item.value} id={`budget-${item.value}`} />
                      <Label htmlFor={`budget-${item.value}`} className="cursor-pointer text-lg flex-1">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" size={28} />
                    Контактные данные
                  </h2>
                  <p className="text-muted-foreground">Как с вами связаться?</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-base mb-2 block">
                      Номер телефона для связи
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="text-lg p-6"
                    />
                  </div>
                  <div>
                    <Label className="text-base mb-3 block">Куда вам отписать?</Label>
                    <RadioGroup value={formData.messenger} onValueChange={(v) => updateFormData('messenger', v)}>
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-all cursor-pointer">
                        <RadioGroupItem value="telegram" id="telegram" />
                        <Label htmlFor="telegram" className="cursor-pointer text-lg flex-1">
                          Телеграм
                        </Label>
                        <Icon name="Send" className="text-muted-foreground" size={20} />
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-all cursor-pointer">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp" className="cursor-pointer text-lg flex-1">
                          Вацап
                        </Label>
                        <Icon name="MessageCircle" className="text-muted-foreground" size={20} />
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6 text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Icon name="Frown" className="text-destructive" size={48} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-destructive">
                  К сожалению...
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Мы не сможем вам помочь, так как услуга восстановления аккаунта стоит более 7.000 рублей.
                </p>
                <p className="text-muted-foreground">
                  Спасибо за ваше время!
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && step !== 9 && (
              <Button
                onClick={prevStep}
                variant="outline"
                size="lg"
                className="gap-2 hover:scale-105 transition-transform duration-300"
              >
                <Icon name="ChevronLeft" size={20} />
                Назад
              </Button>
            )}
            {step < 8 && (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                size="lg"
                className="ml-auto gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:hover:scale-100"
              >
                Далее
                <Icon name="ChevronRight" size={20} />
              </Button>
            )}
            {step === 8 && (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                size="lg"
                className="ml-auto gap-2 bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:hover:scale-100"
              >
                Отправить заявку
                <Icon name="Send" size={20} />
              </Button>
            )}
          </div>
        </Card>

        <div className="text-center mt-8 text-muted-foreground text-sm animate-fade-in">
          <p>Все данные конфиденциальны и используются только для оценки ситуации</p>
        </div>
      </div>
    </div>
  );
};

export default Index;